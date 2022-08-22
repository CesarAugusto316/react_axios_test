import { FC, useState } from 'react';
import axios from 'axios';
import { MyForm, FormValues } from './componets';


export const App: FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = (values: FormValues) => {
    axios.post(`${import.meta.env.VITE_TODOS_API_URL}/auth/login`, values)
      .then(({ data }) => {
        console.log(data.token, 'data fetched from API');
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div id="app" data-theme="dark">
      <section className="section">
        <main className="main">

          {isLogged ? <h1 className="form__heading">Welcome, You are logged in!</h1>
            : <MyForm onSubmit={handleSubmit} />}

        </main>
      </section>
    </div>
  );
};
