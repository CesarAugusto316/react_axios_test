import { FC, useState } from 'react';
import axios from 'axios';
import { MyForm, FormValues } from './componets';


export const App: FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = (values: FormValues) => {
    Promise.resolve()
      .then((res) => {
        console.log(res, 'data fetched from API');
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

          {isLogged ? <h1 className="form__heading">You are logged in!</h1>
            : <MyForm onSubmit={handleSubmit} />}

        </main>
      </section>
    </div>
  );
};
