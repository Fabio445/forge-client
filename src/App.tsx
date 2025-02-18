import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";

function App() {
  // let items = [
  //   "New York",
  //   "Los Angeles",
  //   "Chicago",
  //   "Houston",
  //   "Phoenix",
  //   "Philadelphia",
  //   "San Antonio",
  // ];

  // // Optional handler
  // const onSelectItem = (item: string) => {
  //   console.log(item);
  // };

  // return (
  //   <div>
  //     <ListGroup
  //       items={items}
  //       heading="Cities"
  //       onSelectItem={(item: string) => console.log(item)}
  //     />
  //   </div>
  // );

  return <div><Alert children="Hello World" /></div>;
}

export default App;
