import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do personagem: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterDetails();
    }, [id]);

    if (loading) {
        return <Loading>Carregando detalhes do personagem...</Loading>;
    }

    if (!character) {
        return <Error>Nenhum personagem encontrado com o ID: {id}</Error>;
    }

    return (
        <Container>
            <GlobalStyle />
            <CharacterCard>
                <CharacterImage src={character.image} alt={character.name} />
                <CharacterName>{character.name}</CharacterName>
                <CharacterInfo>Status: {character.status}</CharacterInfo>
                <CharacterInfo>Espécie: {character.species}</CharacterInfo>
                <CharacterInfo>Gênero: {character.gender}</CharacterInfo>
                <CharacterInfo>Origem: {character.origin.name}</CharacterInfo>
                <CharacterInfo>Localização: {character.location.name}</CharacterInfo>
                <CharacterInfo>Episódios:</CharacterInfo>
                <EpisodeList>
                    {character.episode.map((episodeUrl, index) => (
                        <Episode key={index}>
                            <EpisodeTitle>Episódio {index + 1}</EpisodeTitle>
                            <EpisodeDetails>
                                <EpisodeInfo>URL: {episodeUrl}</EpisodeInfo>
                            </EpisodeDetails>
                        </Episode>
                    ))}
                </EpisodeList>
                <CharacterInfo>Data de criação: {new Date(character.created).toLocaleDateString()}</CharacterInfo>
                {character.type && (
                    <CharacterInfo>Tipo de dimensão: {character.type}</CharacterInfo>
                )}
            </CharacterCard>
        </Container>
    );
};

export default CharacterDetails;

// Styled components
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        background: #f0f0f0;
    }
`;

const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
`;

const CharacterCard = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CharacterImage = styled.img`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin-bottom: 15px;
    border: 5px solid #2c3e50;
`;

const CharacterName = styled.h2`
    font-size: 2em;
    color: #2c3e50;
    margin-bottom: 10px;
`;

const CharacterInfo = styled.p`
    font-size: 1.2em;
    color: #34495e;
    margin: 5px 0;
`;

const EpisodeList = styled.div`
    margin-top: 10px;
`;

const Episode = styled.div`
    border-top: 1px solid #ddd;
    padding: 10px 0;
`;

const EpisodeTitle = styled.h3`
    font-size: 1.2em;
    color: #2c3e50;
    margin-bottom: 5px;
`;

const EpisodeDetails = styled.div`
    margin-left: 20px;
`;

const EpisodeInfo = styled.p`
    font-size: 1em;
    color: #34495e;
    margin: 3px 0;
`;

const Loading = styled.div`
    font-size: 1.5em;
    color: #34495e;
    margin-top: 20px;
`;

const Error = styled.div`
    font-size: 1.5em;
    color: red;
    margin-top: 20px;
`;
