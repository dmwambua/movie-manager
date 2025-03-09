const Card = ({title}) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

const App = (t) => {
  return (
    <div>
      <h2>Movie Selection App</h2>)
      <Card title="The Crudes"/>
      <Card title="Transylvania 1"/>
      <Card title="Lorax"/>
    </div>
  );
};

export default App;
