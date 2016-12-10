'use strict';
import React from 'react';
import bootstrap from 'bootstrap';

export class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            text: "",
            file: undefined,
            lat: undefined,
            lon: undefined,
            id: undefined,
            imageInfo: "Загрузите фотографию с места события( это поле можно оставить пустым)",
            response: undefined

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ajaxCall = this.ajaxCall.bind(this);
        this.handleImgCh = this.handleImgCh.bind(this);
        this.handleTextCh = this.handleTextCh.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState(){
        this.setState({text:"",file: undefined,lat: undefined,
            lon: undefined,
            id: undefined});
    }

    ajaxCall(fd){
        let self = this;
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
                $('#UserForm')[0].reset();
                self.resetState();
                $('#SenderModal').modal('hide');
                self.setState({
                    response: "Спасибо!"
                });
                $('#InfoModal').modal('show');

            }).catch(function (error) {
            $('#UserForm')[0].reset();
            self.resetState();
            $('#SenderModal').modal('hide');
            self.setState({
                response: "Извините произошла ошибка =("
            });
            $('#InfoModal').modal('show');
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let self = this;
        var fd = new FormData();
        fd.append('text',this.state.text);
        fd.append('imgUpload', this.state.file);
        fd.append('id', this.props.id);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                fd.append('latitude', position.coords.latitude);
                fd.append('longitude', position.coords.longitude);
                self.ajaxCall(fd);
            });
        } else {
            self.ajaxCall(fd);
        }
        return false;
    }

    handleTextCh(e){
        this.setState({text:e.target.value});
    }

    handleImgCh(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file.name);
        console.log(file.size);
        reader.onerror= () => {
            $('#imgInfo').val('Произошла ошибка загрузки');
        };
        reader.onprogress=() => {
            this.setState({
                imageInfo: "Загрузка"
            })
        };
        reader.onloadend = () => {
            this.setState({
                file: file,
                imageInfo: "Завершено!"
            });
        };

        reader.readAsDataURL(file);

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
                                    <div className="form-group">
                                        <label htmlFor="text">Комментарий:</label>
                                        <input type="text" value={this.state.text} onChange={this.handleTextCh} name="text" id="text" className="form-control"></input>
                                            <span className="help-block">Опишите возникшую ситуацию.</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="imgUpload">File input</label>
                                        <input type="file"  accept="image/jpeg" onChange={this.handleImgCh} id="imgUpload" name="imgUpload"></input>
                                            <p id="imgInfo" className="help-block">{this.state.imageInfo}</p>
                                    </div>

                                    <input type="submit"  onClick={this.handleSubmit} className="btn btn-default" value="Отправить"></input>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>

                <div id="InfoModal" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title" >{this.state.response}</h4>
                                <button type="button" className="btn btn-info" data-dismiss="modal">ОК</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}