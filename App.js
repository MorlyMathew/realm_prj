import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Realm from 'realm';
import { PersonSchema } from './Person';

class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      rate:'',
      bookno:'',
      description:'',
      persons: [],
    };

    // Open a Realm instance with the defined schema
    this.realm = new Realm({ schema: [PersonSchema] });
  }

  // Function to add a person to the Realm
  addPerson = () => {
    this.realm.write(() => {
      this.realm.create('Person', {
        name: this.state.name,
        address: this.state.address,
        rate: this.state.rate,
        bookno:this.state.bookno,
        description:this.state.description,

      });
    });

    this.setState({ name: '', address: '', rate: '', bookno: '', description : '' });
    this.updatePersons();
  };

  // Function to fetch and update the list of persons from the Realm
  updatePersons = () => {
    const persons = this.realm.objects('Person');
    this.setState({ persons });
  };

  // Function to delete a person from the Realm
  deletePerson = (person) => {
    this.realm.write(() => {
      this.realm.delete(person);
    });

    this.updatePersons();
  };

  componentDidMount() {
    this.updatePersons();
  }

  render() {
    return (
      <View>
        <Text style={{fontWeight:'bold',fontSize:15,margin:10}}>Realm Example</Text>
        <TextInput
        style={{padding:10,margin:5}}
          placeholder="Book Name"
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
        />
        {/* <TextInput
          placeholder="Address"
          style={{padding:10,margin:5}}
          value={this.state.address}
          onChangeText={(address) => this.setState({ address })}
        /> */}
           <TextInput
          placeholder="Book No"
          style={{padding:10,margin:5}}
          value={this.state.bookno}
          onChangeText={(bookno) => this.setState({ bookno })}
        />
          <TextInput
          placeholder="book details"
          style={{padding:10,margin:5}}
          value={this.state.description}
          onChangeText={(description) => this.setState({ description })}
        />
          <TextInput
          placeholder="Rate"
          style={{padding:10,margin:5}}
          value={this.state.rate}
          onChangeText={(rate) => this.setState({ rate })}
        />
        <Button 
         title="Add Books" onPress={this.addPerson} />

        <Text style={{padding:10,fontWeight:'bold'}}>Books :</Text>
        {this.state.persons.map((person) => (
          <View style={{padding:10,backgroundColor:'lightgray',margin:5}} key={person.name}>
            <Text>{`Book No : ${person.bookno}, Book Name: ${person.name}`}</Text>
            <Text style={{marginTop:10,marginBottom:10}}>{`Description :  ${person.description}, Rate : ${person.rate}`}</Text>
            <Button
             style={{margin:10}}
              title="Delete"

              onPress={() => this.deletePerson(person)}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default MyComponent;

