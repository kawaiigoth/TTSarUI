'use strict';
import React from 'react';
export class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            text: "",
            file: undefined,
            lat: undefined,
            lon: undefined,
            id: undefined

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.send = this.send.bind(this);
        this.ajaxCall = this.ajaxCall.bind(this);
        this.handleImgCh = this.handleImgCh.bind(this);
        this.handleTextCh = this.handleTextCh.bind(this);
    }

    send(){
        "use strict";
        var fd = new FormData(document.getElementById('UserForm'));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('location', position.coords.latitude);
                fd.append('latitude', position.coords.latitude);
                fd.append('longitude', position.coords.longitude);
                console.log(fd);
                console.log(this.props.id);
                //this.ajaxCall(fd);
            });
        } else {
            //this.ajaxCall(fd);
        }
    }

    ajaxCall(fd){
        var myHeaders = new Headers();
        fetch("/api/send-message",
            {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: fd
            })
            .then(function (res) {
                if (res.status >= 200 && res.status < 300) {
                    return res.statusText;
                } else {
                    var error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            })
            .then(function (data) {
                Form.reset();

            }).catch(function (error) {
            console.log(error);
        });
    }


    handleSubmit(e){
        e.preventDefault();
        alert("Submited");
        //this.send();
        return false;
    }

    handleTextCh(e){
        this.setState({text:e.target.value});
    }

    handleImgCh(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file
            });
        }

    }

    render(){
        return(
            <div>
                <div id="SenderModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Сообщить о проблеме:</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} method="post" id="UserForm">
                                    <input type="hidden" value={this.props.id}/>
                                    <div className="form-group">
                                        <label htmlFor="text">Комментарий:</label>
                                        <input type="text" value={this.state.text} onChange={this.handleTextCh} name="text" id="text" className="form-control"></input>
                                            <span className="help-block">Опишите возникшую ситуацию.</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="imgUpload">File input</label>
                                        <input type="file"  accept="image/jpeg" onChange={this.handleImgCh} id="imgUpload" name="imgUpload"></input>
                                            <p className="help-block">Загрузите фотографию с места события( это поле можно оставить пустым)</p>
                                    </div>

                                    <input type="submit"  onClick={this.handleSubmit} className="btn btn-default" value="Отправить"></input>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}