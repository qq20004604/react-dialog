import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './dialog/dialog.jsx';

class App extends React.Component {
    render() {
        return (<div>
            <button onClick={this.showDialog}>点击显示弹窗</button>
        </div>)
    }

    showDialog = () => {
        Dialog.show({
            title: '这是一个标题',
            article: '这是正文',
            onClose: (isOk) => {
                console.log(Math.random(), isOk)
            }
        });
    }
}

ReactDOM.render(
    <div>
        <App/>
    </div>,
    document.getElementById('root')
);