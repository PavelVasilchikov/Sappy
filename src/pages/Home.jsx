import FlowerCard from '../components/FlowerCard';
import Header from '../components/Header';
import '../styles/home.css'; 
import roseCat from '../imgs/cat.jpg';
import tulpCat from '../imgs/cat2.jpg';
import orhCat from '../imgs/cat3.png';
import lilCat from '../imgs/cat3.jpg'
import pioCat from '../imgs/cat4.jpg'
import gerCat from '../imgs/cat5.jpg'

const flowers = [
  {
    id: 1,
    name: 'Розы красные',
    description: 'Красивые красные розы, символ любви и страсти',
    price: 25.99,
    image: roseCat,
  },
  {
    id: 2,
    name: 'Тюльпаны',
    description: 'Яркие желтые тюльпаны, символ весны и радости',
    price: 15.99,
    image: tulpCat,
  },
  {
    id: 3,
    name: 'Орхидеи',
    description: 'Элегантные белые орхидеи для особых случаев',
    price: 35.99,
    image: orhCat,
  },
  {
    id: 4,
    name: 'Лилии',
    description: 'Ароматные лилии с нежными лепестками',
    price: 22.5,
    image: lilCat,
  },
  {
    id: 5,
    name: 'Пионы',
    description: 'Пышные пионы - фавориты свадебных букетов',
    price: 28.75,
    image: pioCat,
  },
  {
    id: 6,
    name: 'Герберы',
    description: 'Яркие и жизнерадостные герберы',
    price: 18.99,
    image: gerCat,
  },
];

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-container">
        <h1>Добро пожаловать в Sappy!</h1>
        <p>Выберите цветы для себя или в подарок</p>

        <div className="flowers-grid">
          {flowers.map(flower => (
            <FlowerCard key={flower.id} flower={flower} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;