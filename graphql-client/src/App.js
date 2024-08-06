import logo from './logo.svg';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';

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

const ADD_SPEAKER = gql`
  mutation AddSpeaker ($name: String!, $bio: String!, $webSite : String!) {
  addSpeaker(input: {
    name: $name,
    bio: $bio,
    webSite: $webSite }) {
    speaker {
      id
    }
  }
}
`;

function App() {
  return (
    <div className="App">
      <AddSpeaker />
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

function AddSpeaker() {
  let input;
  const [addNewSpeaker, { data, loading, error }] = useMutation(ADD_SPEAKER);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewSpeaker({ variables: { name: input.value, bio : input.value, webSite : input.value} });
          input.value = '';
        }}
      >
        <div>
          <p>Add new speaker</p>
          <input
           ref={node => {
            input = node;
          }}
            type="text"
            placeholder="Enter speaker name"
          />
          <br />
          <br />
          <input
           ref={node => {
            input = node;
          }}
            type="text"
            placeholder="Enter speaker bio"
          />
          <br />
          <br />
          <input
            ref={node => {
              input = node;
            }}
            type="text"
            placeholder="Enter speaker website"
          />
          <br />
          <br />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
