import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Loader } from '../../utils/Loader';
import { SurveyContext } from '../../utils/context';

const SurveyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const QuestionTitle = styled.h2`
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
    margin: 30px;
`;

const LinkWrapper = styled.div`
    padding-top: 30px;
    & a:first-of-type {
        margin-right: 20px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: underline;
    color: ${({ isDarkMode }) =>
        isDarkMode ? colors.darkText : colors.lightText};
    background-color: ${({ isDarkMode }) =>
        isDarkMode ? colors.darkBackground : colors.lightBackground};
    &:hover {
        color: ${colors.primary};
    }
`;

const ReplyBox = styled.button`
    color: ${colors.text};
    border: none;
    height: 100px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.backgroundLight};
    border-radius: 20px;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
    &:first-child {
        margin-right: 15px;
    }
    &:last-of-type {
        margin-left: 15px;
    }
    &:hover {
        color: ${colors.primary};
        border: 1px solid ${colors.primary};
        border-color: ${colors.primary};
    }
`;

const ReplyWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

function Survey() {
    const { questionNumber } = useParams();
    const questionNumberInt = parseInt(questionNumber);
    const prevQuestionNumber =
        questionNumberInt === 1 ? 1 : questionNumberInt - 1;
    const nextQuestionNumber = questionNumberInt + 1;

    const { answers, saveAnswers } = useContext(SurveyContext);
    function saveReply(answer) {
        saveAnswers({ [questionNumber]: answer });
        console.log(answers);
    }

    const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`);
    const surveyData = data?.surveyData || {};

    console.log(data);

    if (error) {
        return <span>Il y a un problème</span>;
    }

    return (
        <SurveyContainer>
            <QuestionTitle>Question {questionNumber}</QuestionTitle>
            {isLoading ? (
                <Loader />
            ) : (
                <QuestionContent>
                    {surveyData && surveyData[questionNumber]}
                </QuestionContent>
            )}
            <ReplyWrapper>
                <ReplyBox
                    onClick={() => saveReply(true)}
                    isSelected={answers[questionNumber] === true}
                >
                    Oui
                </ReplyBox>
                <ReplyBox
                    onClick={() => saveReply(false)}
                    isSelected={answers[questionNumber] === false}
                >
                    Non
                </ReplyBox>
            </ReplyWrapper>
            <LinkWrapper>
                <StyledLink to={`/survey/${prevQuestionNumber}`}>
                    Précédent
                </StyledLink>
                {surveyData[questionNumberInt + 1] ? (
                    <StyledLink to={`/survey/${nextQuestionNumber}`}>
                        Suivant
                    </StyledLink>
                ) : (
                    <StyledLink to="/results">Résultats</StyledLink>
                )}
            </LinkWrapper>
        </SurveyContainer>
    );
}

export default Survey;
