import React, { useState } from "react";
import { Modal } from 'react-native';
import { useForm } from "react-hook-form";

import { Input } from "../../Components/Form/Input";
import { InputForm } from "../../Components/Form/InputForm";
import { Button } from "../../Components/Form/Button";
import { TransactionTypeButton } from "../../Components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton";

import { CategorySelect } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from "./styles";

interface FormData {
    name: string;
    amount: string;

}

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
    } = useForm()

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleRegister(form: FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome"
                        placeholderTextColor="#969CB2"
                    />

                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
                        placeholderTextColor="#969CB2"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />

                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}

                        />
                    </TransactionsTypes>

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button
                    title="enviar"
                    onPress={handleSubmit(handleRegister)}
                />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}