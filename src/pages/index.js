import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import { useState } from 'react';

export default function Home({ countries }) {
	const [ keyword, setKeyword ] = useState('');

	const filterCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(keyword) ||
			country.region.toLowerCase().includes(keyword) ||
			country.subregion.toLowerCase().includes(keyword)
	);

	const onInputChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	return (
		<Layout>
			<div className={styles.inputContainer}>
				<div className={styles.counts}>Found {countries.length} countries</div>
				<div className={styles.input}>
					<SearchInput placeholder="filter by Name, Region or SubRegion" onChange={onInputChange} />
				</div>
			</div>

			<CountriesTable countries={filterCountries} />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const response = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await response.json();

	return {
		props: {
			countries
		}
	};
};
