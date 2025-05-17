import * as React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { Box, Flex, Text, Button as RebassButton } from "rebass"

const PageWrapper = styled(Box)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  margin-bottom: 1rem;
`

const StyledButton = styled(RebassButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  &:hover {
    opacity: 0.9;
  }
`

export default function HomePage() {
  return (
    <PageWrapper>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Title>🎯 Welcome to Quiz Champ!</Title>
        <Text fontSize={2} mb={3}>
          Test your knowledge across multiple categories and levels.
        </Text>
        <StyledButton onClick={() => navigate("/quiz")}>Start Quiz</StyledButton>
      </Flex>
    </PageWrapper>
  )
}
