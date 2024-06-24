import React from 'react';
import styled from 'styled-components';

const Filter = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <FilterContainer>
            <Input
                type="text"
                name="name"
                placeholder="Procure pelo nome"
                value={filters.name}
                onChange={handleChange}
            />
            <Select name="status" value={filters.status} onChange={handleChange}>
                <option value="">Todos os Status</option>
                <option value="alive">Vivo</option>
                <option value="dead">Morto</option>
                <option value="unknown">Sem Registro</option>
            </Select>
            <Select name="species" value={filters.species} onChange={handleChange}>
                <option value="">Todas Especies</option>
                <option value="human">Humano</option>
                <option value="alien">Alienigena</option>
                <option value="robot">Robo</option>
                <option value="animal">Animal</option>
                <option value="mythological">Mitológico</option>
            </Select>
            <Select name="gender" value={filters.gender} onChange={handleChange}>
                <option value="">Todos os Gêneros</option>
                <option value="male">Homem</option>
                <option value="female">Feminino</option>
                <option value="genderless">Sem gênero</option>
                <option value="unknown">Sem Registro</option>
            </Select>
        </FilterContainer>
    );
};

export default Filter;

// Styled components
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
`;
