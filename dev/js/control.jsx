'use strict';
import React from 'react';
export class Control extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="control-form">
                <fieldset className="form-group">
                    <legend>Управление состояние маршрута</legend>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="routeState" id="normalRad"
                                   value="normal" checked/>
                            Маршрут двигается по распсанию
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="routeState" id="dutyRad"
                                   value="duty"/>
                            Маршрут в дежурном режиме
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio" className="form-check-input" name="routeState" id="stopedRad"
                                   value="stoped"/>
                            Маршрут не работает
                        </label>
                    </div>
                </fieldset>
                <div className="form-group">
                    <label htmlFor="routeComment">Информация о маршруте</label>
                    <textarea placeholder="Та самая информация, что пишется при нажатии на кнопочку" className="form-control control-form__textarea" id="routeComment" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="fileUpload">Загрузить фотографию</label>
                    <input type="file" accept="image/*" className="form-control-file" id="fileUpload"/>
                    <small id="fileHelp" className="form-text text-muted">Используйте картинки формата такогото, размера - воттакогота.
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">Сохранить изменения</button>
            </form>

        )
    }
}