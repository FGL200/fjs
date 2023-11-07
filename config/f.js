class FJS {
    constructor(type) {
        this.__create__(type);
     }

    __create__(type) {
        this.__element__ = document.createElement(type);
        return this;
    }

    __after__() {
        return this.__m_after__  = this.__m_after__ ? this.__m_after__ : [];
    }

    __before__() {
        return this.__m_before__ = this.__m_before__ ? this.__m_before__ : [];
    }
    
    html(html) {
        if(!html) return this;

        if(typeof html === typeof "") {
            this.element().innerHTML = html;
        } else {
            html(this.element().innerHTML);
        }
        return this;
    }

    text(text) {
        if(!text) return this;

        if(typeof text === typeof "") {
            this.element().innerText = text;
        } else {
            text(this.element().innerText);
        }
        return this;
    }

    on(event, callBack = null) {
        if(!event) return this;
        
        this.element().addEventListener(event, callBack);
        return this;
    }

    off(event, callBack = null) {
        if(!event) return this;
        
        this.element().removeEventListener(event, callBack);
        return this;
    }

    trigger(e) {
        if(!e) return this;
        
        const event = new CustomEvent(e);
        this.element().dispatchEvent(event);
        return this;
    }

    appendTo(element) {
        if(!element) return this;
        
        if(typeof element === typeof "")
            document.querySelector(element).append(this.element());
        else if(element instanceof FJS) {
            element.append(this.element());
        }
        return this;
    }

    append(fObject, ...fObjects) {
        if(!fObject) return this;
        
        fObjects.unshift(fObject);
        for(let f of fObjects) {
            for(let before of f.before()) this.element().append(before);
            this.element().append(f.element());
            for(let after of f.after()) this.element().append(after);
        }
        return this;
    }

    addClass(c) {
        if(!c) return this;
        
        this.element().setAttribute("class", c)
        return this;
    }

    removeClass(c) {
        if(!c) return this;
        
        this.element().classList.remove(c);
        return this;
    }

    id(newId) {
        if(!newId) return this;
        
        this.element().setAttribute("id", newId);
        return this;
    }

    style(styles = {}) {
        if(!styles) return this;
        
        for(let style in styles) this.element().style[style] = styles[style];
        return this;
    }

    attribute(name, value){
        if(!name) return this;
        
        if(typeof name === typeof "")
            this.element().setAttribute(name, value)
        else if(typeof name == typeof {}) {
            for(let attr in name){
                this.element().setAttribute(attr, name[attr])
            }
        }
        return this;
    }

    type(type) {
        if(!type) return this;
        
        this.element().setAttribute("type", type)
        return this;
    }

    value(value) {
        if(!value) return this;
        
        if(typeof value === typeof "") {
            this.element().value = value;
        } else {
            value(this.element().value);
        }
        return this;
    }

    prop(prop, getVal = null) {
        if(!prop) return this;
        
        if(getVal) getVal(this.element().hasAttribute(prop))
        else this.element().setAttribute(prop, "");
        return this;
    }

    removeProp(prop) {
        if(!prop) return this;
        
        this.element().removeAttribute(prop);
        return this;
    }

    children(callBack = null) {
        if(!callBack) return this;
        
        if(callBack) this.element().children().forEach(callBack);
        return this;
    }

    remove(){
        return this.element().remove();
    }

    element() {
        return this.__element__ ? this.__element__ : new FJS("undefine");
    }

    before(fObject, ...fObjects) {
        if(!fObject) return this.__before__();
        fObjects.unshift(fObject);
        for(let obj of fObjects) this.__after__().push(obj)
        return this;
    }

    after(fObject, ...fObjects) {
        if(!fObject) return this.__after__();
        fObjects.unshift(fObject);
        for(let obj of fObjects) this.__after__().push(obj)
        return this;
    }
    
    static css(link) {
        if(!link) return;
        
        document.querySelector("head").append(
            (new FJS("link"))
            .attribute({"rel":"stylesheet", "href":link})
            .element()
        )
    }

    static title(title) {
        if(!title) return;
        
        document.querySelector("head").append(
            (new FJS("title"))
            .text(title)
            .element()
        )
    }
}

function f(type) {
    return (new FJS()).__create__(type);
}

function showAlert(c, callBack=null){
    if(!c) return;

    let buttons = [];
    if(c.buttons) {
        for(let btn of c.buttons) buttons.push(f("button").html(btn))
    }else{
        buttons.push(
            f("button")
            .addClass("btn btn-primary")
            .text("Okay")
        )
    }

    const container = 
    f("div")
    .style({
        position : "fixed",
        top : 0,
        left : 0,
        width: "100vw",
        height : "100vh",
        background : "rgba(0,0,0,0.8)"
    })
    .addClass("flex-row justify-content-center align-items-center")
    .append(
        f("div")
        .addClass("card p-1 m-1 flex-column gap-2")
        .style({background : "white"})
        .append(
            f("section")
            .html(c.title ? c.title : "Title"),
            f("section")
            .html(c.body ? c.body : "Body"),
            f("section")
            .append(
                buttons.length === 2 ? (
                    buttons[0],
                    buttons[1]
                ) : 
                buttons[0]
            )
        )
    )
    .appendTo("body");
}