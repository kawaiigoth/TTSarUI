'use strict';
import React from 'react';
export class Control extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            routeState: undefined,
            file: undefined,
            text: undefined,
            id: undefined,
            imgInfo: "принимаются файлы формата .jpg"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ajaxCall = this.ajaxCall.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleRadioCHange = this.handleRadioCHange.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
    }


    ajaxCall(fd){
        console.log(fd.get('text'));
        console.log(fd.get('routeState'));
    }

    handleSubmit(e){
        e.preventDefault();
        let self = this;
        var fd = new FormData();
        fd.append('routeState',this.state.routeState);
        fd.append('imgUpload', this.state.file);
        fd.append('text', this.state.text);
        fd.append('id', this.props.id);
        self.ajaxCall(fd);
        return false;
    }

    handleRadioCHange(e){

        this.setState({routeState:e.currentTarget.value});
    }

    handleInfoChange(e){
        this.setState({text:e.target.value});
    }
    handleImageChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onerror= () => {
            this.setState({
                imageInfo: "Ошибка загрузки"
            })
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

    render() {
        return (
            <form className="control-form" onSubmit={this.handleSubmit}>
                <fieldset className="form-group">
                    <legend>Управление состоянием маршрута</legend>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={this.handleRadioCHange}  checked={this.state.routeState === "normal"}  type="radio" className="form-check-input" name="routeState"
                                   value="normal" />
                            Маршрут двигается по расписанию
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={this.handleRadioCHange} checked={this.state.routeState === "duty"} type="radio" className="form-check-input" name="routeState"
                                   value="duty"/>
                            Маршрут в дежурном режиме
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={this.handleRadioCHange} checked={this.state.routeState === "stoped"} type="radio" className="form-check-input" name="routeState"
                                   value="stoped"/>
                            Маршрут не работает
                        </label>
                    </div>
                </fieldset>
                <div className="form-group">
                    <label>Информация о маршруте
                    <textarea onChange={this.handleInfoChange} placeholder="Информация о маршруте" className="form-control control-form__textarea"  rows="3"></textarea>
                    </label>
                </div>
                <div className="form-group">
                    <label className="btn btn-default">Загрузить фотографию
                    <input onChange={this.handleImageChange} type="file" style={{display:'none'}} accept="image/*" className="form-control-file" id="fileUpload"/>
                    </label>
                    <small id="fileHelp" className="form-text text-muted">{this.state.imgInfo}
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
            </form>

        )
    }
}