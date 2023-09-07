import React from 'react'
import { useState } from 'react'
import $ from 'jquery'
import swal from 'sweetalert';
import classes from './form.module.css'
const initialData ={
    name: '',
    tell: '+998',
    text: '',
    textTwo: '',
    }
const Form = () => {
   
    const [fields,setFields] = useState(initialData)
    const [error, setError] = useState({})
  
    const handleChange = (e) => {
       
     const {name, value} = e.target
     if(e.target.name === tell){
        e.target.value.replace(/[^0-9]/g, "");
    }
     
     setFields({
        ...fields, [name] : value
    })
    }
    var telegram_bot_id = "6044421804:AAHHoJoX1szgVpwZBVxVxiAH6YKtBHzlL2M";
    var chat_id =5317445546; 
    var u_name, tell, message, messageTwo;
    var ready = function() {
        u_name = fields.name;
        tell = fields.tell;
        message = fields.text;
        messageTwo = fields.textTwo
        message = "Ismi: " + u_name + "\nTell: " + tell + "\nBiznes: " + message + "\nMuammo: " + messageTwo;
    };
  
  var sendtelegram = function(e) {
      ready();
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
          "method": "POST",
          "headers": {
              "Content-Type": "application/json",
              "cache-control": "no-cache"
          },
          "data": JSON.stringify({
              "chat_id": chat_id,
              "text": message
          })
      };
  
  
     
  
  e.preventDefault()
  const fieldsEror = {}
  if(!fields.name.trim()) {
    fieldsEror.name = 'username is required'
  }
  
  if(!fields.tell.trim()){
  fieldsEror.tell = 'tell is required'
  } else if(!/^(\+998\d{9})$/.test(fields.tell) ){
    fieldsEror.tell = 'telefon raqamingizni to`liq kiriting'
  }
  if(!fields.text.trim()){
    fieldsEror.text = 'text is required'
    } else if(!fields.text.length > 5){
      fieldsEror.text = 'text not valid'
    }
    if(!fields.textTwo.trim()){
      fieldsEror.textTwo = 'textTwo is required'
      } else if(!fields.textTwo.length > 5){
        fieldsEror.textTwo = 'textTwo not valid'
      }
  setError(fieldsEror)
  
      if(Object.keys(fieldsEror).length === 0){
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Jo`natildi!",
      });
          $.ajax(settings).done(function(response) {
      }); 
      setFields(initialData)
      }
      
  };
  return (
    <div className={classes['form']}>
        
                <form className={classes['validate__form']} onSubmit={sendtelegram}>
                 <input type="text" value={fields.name}  onChange={handleChange} name='name' placeholder='Ismingiz'  required/>
                 {error.name && <span className={classes['validate__form__span']}>{error.name}</span>}
                 <input 
                  type='tel'
                     value={fields.tell}
                     name='tell'
                     onChange={handleChange}
                     maxLength={12}
                        required 
                        placeholder='tell raqamingiz'
                        />
                 {error.tell && <span className={classes['validate__form__span']}>{error.tell}</span>}
                 <input type="text" onChange={handleChange}   value={fields.text}  name='text' placeholder='Biznes faoliyatingiz' required/>
                 {error.text && <span className={classes['validate__form__span']}>{error.text}</span>}
                 <input type="text" onChange={handleChange}   value={fields.textTwo} name='textTwo' placeholder='Muammoingiz' required/>
                 {error.textTwo && <span className={classes['validate__form__span']}>{error.textTwo}</span>}
                 <button className={classes['validate__form__btn']}>Jo`natish</button>
          </form>
    </div>
  )
}

export default Form