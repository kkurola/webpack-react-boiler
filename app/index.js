import React from 'react';
import { render } from 'react-dom';

import { Root } from './components';
const rootEl = document.getElementById('root');
const props = {
    name: 'Reactor'
};

render(<Root name={props.name} />, rootEl);

// const renderApp = () => {
//     render(
//         <Appcontainer>
//             <Hello />
//         </Appcontainer>,
//         document.getElementById('root')
//     );
// };
// const renderApp = (routes) => {
//   render(
//     <AppContainer>
//       <Root routes={routes} />
//     </AppContainer>,
//     document.getElementById('root')
//   );
// };

//renderApp();

if (module.hot) {
    module.hot.accept('./components', () => {
        const newRoot = require('./components').Root;
        render(newRoot(props), rootEl);
    });
}
