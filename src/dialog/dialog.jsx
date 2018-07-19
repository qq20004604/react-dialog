import React from 'react';
import ReactDOM from 'react-dom';
import './dialog.css';

class Dialog extends React.Component {
    render() {
        const {useDefault, defaultContent, content, onclose} = this.props;
        let DOM = null;
        if (!useDefault) {
            if (content) {
                DOM = content;
            } else {
                throw new Error('你尝试使用自定义内容，但并没有将自定义jsx内容传入');
                return;
            }
        } else {
            DOM = <div>
                <div className='dialog-title'>{defaultContent.title}</div>
                <div className='dialog-article'>{defaultContent.article}</div>
                <div className='dialog-footer'>
                    <div className='dialog-cancelBtn' onClick={() => onclose(false)}>{defaultContent.cancelBtn}</div>
                    <div className='dialog-okBtn' onClick={() => onclose(true)}>{defaultContent.okBtn}</div>
                </div>
            </div>
        }

        return <div className='dialog-container'>
            {DOM}
        </div>
    }
}

class DialogContainer extends React.Component {
    state = {
        isShow: false,
        content: null,

        useDefault: true,
        defaultContent: {
            title: '',
            article: '',
            okBtn: '确定',
            cancelBtn: '取消',
            onClose: () => {
            }
        }
    }

    render() {
        if (!this.state.isShow) {
            return null;
        }

        return <div id='dialog-qq20004604'>
            <div className='dialog-bg' onClick={() => this.hide(false)}></div>
            <Dialog content={this.state.content}
                    useDefault={this.state.useDefault}
                    defaultContent={this.state.defaultContent}
                    onclose={this.hide}/>
        </div>
    }

    // 设置弹窗显示
    show = args => {
        let defaultContent = Object.assign({}, {
            title: '',
            article: '',
            okBtn: '确定',
            cancelBtn: '取消',
            onClose: () => {
            }
        }, args)

        this.setState({
            isShow: true,
            useDefault: true,
            defaultContent
        })
    }

    // 设置弹窗显示
    hide = (isOK) => {
        // console.log('hide', isOK)
        this.state.defaultContent.onClose(isOK)
        this.setState({
            isShow: false
        })
    }

    // 设置自定义DOM
    setContent = content => {
        this.setState({
            content
        })
    }
}

const DOM = document.createElement("div");

const ReactDialog = ReactDOM.render(
    <DialogContainer/>,
    DOM
);


class DialogController {
    show(args) {
        document.body.append(DOM);
        ReactDialog.show(args);
    }

    hide() {
        document.body.remove(DOM);
    }
}

export default new DialogController();