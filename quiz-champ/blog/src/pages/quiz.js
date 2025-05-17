import React, { useState, useMemo, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Box, Flex, Text, Button as RebassButton, Heading } from "rebass"

export const query = graphql`
  query QuizData {
    allContentfulQuizQuestion {
      nodes {
        question {
          question
        }
        options
        correctAnswer
        category
        difficulty
      }
    }
  }
`

const OptionButton = styled(RebassButton)`
  margin: 0.5rem 0;
  padding: 12px 20px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  color: black !important;
  background-color: #f2f2f2;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: all 0.2s ease;

  ${({ active }) =>
    active &&
    `
    background-color: #e0f3ff;
    border-color: #007acc;
  `}

  ${({ correct }) =>
    correct &&
    `
    background-color: #4CAF50;
    border-color: #4CAF50;
    color: white !important;
  `}

  ${({ wrong }) =>
    wrong &&
    `
    background-color: #f44336;
    border-color: #f44336;
    color: white !important;
  `}

  &:hover {
    cursor: pointer;
    opacity: 0.95;
  }
`

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  font-size: 1rem;
`

const StyledButton = styled(RebassButton)`
  padding: 10px 20px;
  margin-top: 1rem;
  font-size: 1rem;
  background-color: #007acc;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

export default function QuizPage({ data }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [restartKey, setRestartKey] = useState(0)
  const [timer, setTimer] = useState(15)
  const [leaderboard, setLeaderboard] = useState(() => {
    return JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]")
  })
  const [showNamePrompt, setShowNamePrompt] = useState(false)
  const [playerName, setPlayerName] = useState("")

  const questions = useMemo(() => {
    return shuffleArray(
      data.allContentfulQuizQuestion.nodes.map(q => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    )
  }, [data, restartKey])

  const currentQuestion = questions[current]
  const isCorrect = selected === currentQuestion?.correctAnswer
  const isLast = current === questions.length - 1

  useEffect(() => {
    if (isSubmitted) return
    if (timer === 0) {
      handleSubmit()
      return
    }
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [timer, isSubmitted])

  const handleSubmit = () => {
    if (isCorrect) setScore(prev => prev + 1)
    setIsSubmitted(true)
  }

  const handleNext = () => {
    setCurrent(prev => prev + 1)
    setSelected(null)
    setIsSubmitted(false)
    setTimer(15)
  }

  const handleRestart = () => {
    setRestartKey(prev => prev + 1)
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setIsSubmitted(false)
    setTimer(15)
    setShowNamePrompt(false)
    setPlayerName("")
  }

  const saveScore = () => {
    const newEntry = {
      name: playerName || "Anonymous",
      score,
      total: questions.length,
      percent: Math.round((score / questions.length) * 100),
      date: new Date().toLocaleString()
    }
    const updated = [newEntry, ...leaderboard].slice(0, 5)
    localStorage.setItem("quiz_leaderboard", JSON.stringify(updated))
    setLeaderboard(updated)
    setShowNamePrompt(false)
  }

  return (
    <Box maxWidth={700} mx="auto" p={3}>
      <Heading mb={3}>Quiz Champ</Heading>
      <Text fontSize={2} mb={1}>Category: {currentQuestion.category}</Text>
      <Text fontSize={2} mb={3}>Difficulty: {currentQuestion.difficulty}</Text>

      <Text fontSize={3} fontWeight="bold" mb={2}>{currentQuestion.question.question}</Text>

      <Text fontSize={1} mb={2}>⏱ Time Left: {timer}s</Text>

      <Box>
        {currentQuestion.options.map((option, index) => (
          <OptionButton
            key={index}
            onClick={() => setSelected(option)}
            active={selected === option}
            disabled={isSubmitted}
            correct={isSubmitted && option === currentQuestion.correctAnswer}
            wrong={isSubmitted && option === selected && option !== currentQuestion.correctAnswer}
          >
            {option}
          </OptionButton>
        ))}
      </Box>

      {!isSubmitted ? (
        <StyledButton onClick={handleSubmit} disabled={!selected}>Submit</StyledButton>
      ) : isLast ? (
        <Box mt={4}>
          <Text fontSize={2} mb={2}>
            Final Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
          </Text>
          <Text mb={3}>
            {score === questions.length
              ? "🎉 Perfect score! You're a quiz champ!"
              : score >= questions.length * 0.7
              ? "👍 Great job!"
              : score >= questions.length * 0.4
              ? "😅 Not bad, keep practicing!"
              : "👀 Try again, you can do better!"}
          </Text>

          {!showNamePrompt ? (
            <>
              <StyledButton onClick={() => setShowNamePrompt(true)}>Save Score</StyledButton>
              <StyledButton onClick={handleRestart}>Restart Quiz</StyledButton>
            </>
          ) : (
            <Flex mt={3} alignItems="center">
              <StyledInput
                placeholder="Enter your name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
              />
              <StyledButton onClick={saveScore}>Confirm</StyledButton>
            </Flex>
          )}

          <Heading mt={4} mb={2}>🏆 Leaderboard</Heading>
          <Box as="ol">
            {leaderboard.map((entry, index) => (
              <li key={index}>
                {entry.name} - {entry.score}/{entry.total} ({entry.percent}%) on {entry.date}
              </li>
            ))}
          </Box>
        </Box>
      ) : (
        <StyledButton onClick={handleNext}>Next Question</StyledButton>
      )}
    </Box>
  )
}
