import React from 'react';
import './App.css';
import ValidationComponent from './validation/ValidationComponent';
import CharComponent from './validation/CharComponent';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      textLength: 0,
      text: '',
      listOfChars: [],
    }
  }

  getTextHandler = event => {
    let listOfChars;
    let [textLength, text] = [
            this.state.textLength, 
            this.state.text
          ];

    text = event.target.value;
    textLength = text.length;
    listOfChars = text.split('')
                      .map((char,index) => {
                        return {id:index, char:char};
                      });

      this.setState({
      textLength: textLength,
      text: text,
      listOfChars: listOfChars,
    })
  }

  deleteCharHandler = ((event,index) => {   
    const char = event.target.textContent
    const listOfChars = [...this.state.listOfChars]
    const updatedText = this.state.text.replace(char, '');

    const updatedCharList = listOfChars.filter((charSet, set) => {
      return charSet.id !== index
    })

    this.setState({
      listOfChars: updatedCharList,
      text: updatedText
    })

  });

  render(){
    const charBox = this.state.listOfChars
                              .map((char, index) => {
                                return (                          
                                  <div className={'char-container'}>
                                    <ul key={index} className={'char-styling'}>                                        
                                          <CharComponent  deleteChar={(event) => this.deleteCharHandler(event, this.state.listOfChars[index].id)}
                                                          singleChar={char.char}
                                                           />                                        
                                      </ul>
                                  </div>)
    });

    return (
      <div className="App">
        <h1>Min Length Is 6 characters</h1>

        <input type='text'
                onChange={this.getTextHandler}
                value={this.state.text} />

        <ValidationComponent a
            textLength={this.state.textLength}
        />
        {charBox}
      </div>
    )
  }
}

export default App;
