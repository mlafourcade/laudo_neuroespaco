import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Input } from './src/components/Input';
import { useEffect, useState } from 'react';

import { useProductDatabase, ProductDatabase } from "./src/database/useProductDatabase"

export default function App() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<ProductDatabase[]>([])

  // const productDatabase = useProductDatabase()

  // async function create() {
  //   try {
  //     if (isNaN(Number(quantity))) {
  //       return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
  //     }

  //     const response = await productDatabase.create({
  //       name,
  //       quantity: Number(quantity),
  //     })

  //     Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function update() {
  //   try {
  //     if (isNaN(Number(quantity))) {
  //       return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
  //     }

  //     const response = await productDatabase.update({
  //       id: Number(id),
  //       name,
  //       quantity: Number(quantity),
  //     })

  //     Alert.alert("Produto atualizado!")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function list() {
  //   try {
  //     const response = await productDatabase.searchByName(search)
  //     setProducts(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function remove(id: number) {
  //   try {
  //     await productDatabase.remove(id)
  //     await list()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // function details(item: ProductDatabase) {
  //   setId(String(item.id))
  //   setName(item.name)
  //   setQuantity(String(item.quantity))
  // }

  // async function handleSave() {
  //   if (id) {
  //     update()
  //   } else {
  //     create()
  //   }

  //   setId("")
  //   setName("")
  //   setQuantity("")
  //   await list()
  // }

  // useEffect(() => {
  //   list()
  // }, [search])
  
  return (
    <View style={styles.container}>
      <Input placeholder='Nome' />
      <Input placeholder='Quantidade' />
      <Button title='Salvar' />
      {/* <Text>teste!</Text> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    padding: 32,
    gap: 16,
    justifyContent: 'center',
  },
});
