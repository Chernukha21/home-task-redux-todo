import classes from "./App.module.scss";
import TodoList from "./components/Todo/Todo.jsx";
import WeatherWidget from "./components/weatherWidget/WeatherWidget.jsx";

function App() {

  return (
      <>
          <div className={classes.container}>
              <header className={classes.header}>
                  <img src="/mounts.png" alt="mount" />
              </header>

              <main className={classes.content}>
                  <WeatherWidget />
                  <div className={classes.toDo}>
                      <TodoList />
                  </div>
              </main>
          </div>
      </>
  )
}

export default App
