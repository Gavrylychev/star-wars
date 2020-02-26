import React, { useState, useEffect } from 'react';
import { api } from '../services/index';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { RenderFavorite } from './favorite';

export const RenderPeople = () => {
  const [people, setPeople] = useState([]);
  const [favorite, setFavorite] = useState([]);
  // const favoriteContext = React.createContext();

  useEffect(() => {
    function getAllPeople() {
      let allPeople = [];
      return api
        .get('/people/')
        .then(response => {
          allPeople = response.data.results;
          return response.data.count;
        })
        .then(count => {
          const numberOfPagesLeft = Math.ceil((count - 1) / 10);
          let promises = [];
          for (let i = 2; i <= numberOfPagesLeft; i++) {
            promises.push(api.get(`/people?page=${i}`));
          }
          return Promise.all(promises);
        })
        .then(response => {
          allPeople = response.reduce(
            (acc, data) => [...acc, ...data.data.results],
            allPeople
          );
          return allPeople;
        })
        .catch(error => console.log("Can't get all people", error));
    }

    (async () => {
      const starWarsPeople = await getAllPeople();
      setPeople(starWarsPeople);
      console.log('There all Star Wars Persons', starWarsPeople.length);
    })();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      render: text => <span>{text}</span>,
      sorter: (a, b) => a.height - b.height
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: text => <span>{text}</span>
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      key: 'mass',
      render: text => <span>{text}</span>,
      sorter: (a, b) => a.height - b.height
    },
    {
      title: 'Skin color',
      dataIndex: 'skin_color',
      key: 'skin_color',
      render: text => <span>{text}</span>
    },
    {
      title: 'Birth year',
      dataIndex: 'birth_year',
      key: 'birth_year',
      render: text => <span>{text}</span>
    },
    {
      title: 'Action',
      key: 'action',
      render: item => (
        <span>
          <Button
            type="primary"
            onClick={() => {
              setFavorite([...favorite, item]);
            }}
          >
            Add to favorite
          </Button>
        </span>
      )
    }
  ];

  console.log(favorite);
  return (
    <div
      style={{
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Button
        type="danger"
        style={{
          width: '300px',
          marginBottom: '30px'
        }}
      >
        <Link to="/favorite">Favorite</Link>
      </Button>
      <Table
        columns={columns}
        dataSource={people}
        rowKey={people => people.name}
        style={{ width: '100%' }}
      />
    </div>
  );
};
