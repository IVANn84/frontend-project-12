import { loremIpsum } from 'lorem-ipsum';
const BuildPage = (name) => (
  <>
    <h3>{name}</h3>
    <div>
      {name} content :{loremIpsum({ count: 5 })}
    </div>
  </>
);

export const PageLogin = () => BuildPage('LoginPage');
export const NotFoundPage = () => BuildPage('error 404');
