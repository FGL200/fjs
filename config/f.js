class FJS {
    constructor(type) {
        this.__create__(type);
     }

    __create__(type) {
        this.__element__ = document.createElement(type);
        return this;
    }
    
    html(html) {
        if(typeof html === typeof "") {
            this.element().innerHTML = html;
        } else {
            html(this.element().innerHTML);
        }
        return this;
    }

    text(text) {
        if(typeof text === typeof "") {
            this.element().innerText = text;
        } else {
            text(this.element().innerText);
        }
        return this;
    }

    on(event, callBack) {
        this.element().addEventListener(event, callBack);
        return this;
    }

    appendTo(element) {
        if(typeof element === typeof "")
            document.querySelector(element).append(this.element());
        else if(typeof element === typeof FJS) {
            element.append(this.__element__);
        }
        return this;
    }

    append(fObject) {
        if(typeof fObject === typeof FJS) {
            this.element().append(fObject.element());
        } else if(typeof fObject === typeof []) {
            for(let f of fObject) this.element().append(f.__element__);
        } else {
            console.error("Parameter is not FJS object.");
        }
        return this;
    }

    addClass(classList) {
        this.element().setAttribute("class", classList)
        return this;
    }

    removeClass(c) {
        this.element().classList.remove(c);
        return this;
    }

    id(newId) {
        this.element().setAttribute("id", newId);
        return this;
    }

    style(styles = {}) {
        for(let style in styles) this.element().style[style] = styles[style];
    }

    attribute(name, value){
        if(typeof name === typeof "")
            this.element().setAttribute(name, value)
        else if(typeof name === typeof {}) {
            for(let attr in name){
                this.element().setAttribute(attr, name[attr])
            }
        }
        return this;
    }

    type(type) {
        this.element().setAttribute("type", type)
        return this;
    }

    value(value) {
        if(typeof value === typeof "") {
            this.element().value = value;
        } else {
            value(this.element().value);
        }
        return this;
    }

    prop(prop, getVal = null) {
        if(getVal) getVal(this.element().hasAttribute(prop))
        else this.element().setAttribute(prop, "");
        return this;
    }

    removeProp(prop) {
        this.element().removeAttribute(prop);
        return this;
    }

    children(callBack = null) {
        if(callBack) this.element().children().forEach(callBack);
        return this;
    }

    remove(){
        return this.element().remove();
    }

    element() {
        return this.__element__ ? this.__element__ : new FJS("undefine");
    }
}

function f(type) {
    return (new FJS()).__create__(type);
}