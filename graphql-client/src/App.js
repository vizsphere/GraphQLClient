import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const gqlGetSpeakers = gql`
  query getSpeakers {
    speakers {
      id
      name
      bio
      webSite
    }
  }
`
function App() {
  return (
    <div className="App">
      <DisplaySpeakers />
    </div>
  );
}

function DisplaySpeakers() {
  const { loading, error, data } = useQuery(gqlGetSpeakers);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.speakers.map(({ bio, name, id }) => (
    <div key={id}>
      <h3>{name}</h3>
      <br />
      <p>{bio}</p>
      <br />
      <p>{id}</p>
      <br />
    </div>
  ));
}
export default App;
