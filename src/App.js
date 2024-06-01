import './App.css';
import React, { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('введите значение');
		console.log(promptValue);
		setValue(promptValue);
		if (promptValue.length < 3) {
			setError('введенное сообщение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (value && value.length >= 3) {
			const id = Date.now();
			const listDate = new Date().toLocaleString();
			const newElement = { id, value, listDate };
			const updatedList = [...list, newElement];
			setList(updatedList);
			setValue('');
			setError('');
		}
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>: "
					<output className={styles['current-value']}>{value}</output>"
				</p>
				{error && <div className={styles.error}>{error}</div>}
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueValid}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>
					{list.length > 0 ? (
						<ul className={styles.list}>
							{list.map((item) => (
								<li key={item.id} className={styles['list-item']}>
									{item.value} <span>{item.listDate}</span>
								</li>
							))}
						</ul>
					) : (
						<p className={styles['no-margin-text']}>
							Нет добавленных элементов
						</p>
					)}
				</div>
			</div>
		</>
	);
};
