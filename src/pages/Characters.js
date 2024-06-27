import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Filter from './Filter';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        species: '',
        gender: ''
    });

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const params = {
                    page,
                    name: filters.name,
                    status: filters.status,
                    species: filters.species,
                    gender: filters.gender
                };
                const response = await axios.get('https://rickandmortyapi.com/api/character', { params });
                setCharacters(prevCharacters => page === 1 ? response.data.results : [...prevCharacters, ...response.data.results]);
                setHasMore(response.data.info.next !== null);
            } catch (error) {
                console.error('Erro ao buscar dados: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [page, filters]);

    const loadMoreCharacters = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleFilterChange = (newFilters) => {
        setPage(1); 
        setFilters(newFilters);
    };

    return (
        <div>
            <GlobalStyle />
            <Container>
                <Title>Rick and Morty</Title>
                <Filter filters={filters} setFilters={handleFilterChange} />
                <CharacterList>
                    {characters.map(character => (
                        <CharacterLink key={character.id} to={`/CharacterDetails/${character.id}`}>
                            <CharacterCard>
                                <CharacterImage src={character.image} alt={character.name} />
                                <CharacterName>{character.name}</CharacterName>
                                <CharacterInfo>Status: {character.status}</CharacterInfo>
                                <CharacterInfo>Espécie: {character.species}</CharacterInfo>
                                <CharacterInfo>Gênero: {character.gender}</CharacterInfo>
                                <CharacterInfo>Origem: {character.origin.name}</CharacterInfo>
                            </CharacterCard>
                        </CharacterLink>
                    ))}
                </CharacterList>
                {loading && <Loading>Carregando...</Loading>}
                {hasMore && !loading && (
                    <LoadMoreButton onClick={loadMoreCharacters}>
                        Ver mais
                    </LoadMoreButton>
                )}
            </Container>
        </div>
    );
};

export default Characters;

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
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3em;
    color: #2c3e50;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
`;

const CharacterList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
`;

const CharacterLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const CharacterCard = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    }
`;

const CharacterImage = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
    border: 5px solid #2c3e50;
`;

const CharacterName = styled.h2`
    font-size: 1.5em;
    color: #2c3e50;
    margin-bottom: 10px;
`;

const CharacterInfo = styled.p`
    font-size: 1em;
    color: #34495e;
    margin: 5px 0;
`;

const LoadMoreButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
`;

const Loading = styled.div`
    font-size: 1.5em;
    color: #34495e;
    margin-top: 20px;
`;
