import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './css/base.less'

import { AppContainer } from 'react-hot-loader'

// const render = Component => {
//     ReactDOM.render(
//         <AppContainer>
//             <Component />
//         </AppContainer>,
//         document.getElementById('root')
//     )
// }

// render(App)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
    module.hot.accept()
    // module.hot.accept('./components/App/', () => {
    //     render(App)
    // })
}