import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home({ countries }) {
	console.log(countries);
	return (
		<Layout>
			<div className={styles.counts}>Found {countries.length} countries</div>
			<SearchInput placeholder="filter by Name, Region or SubRegion" />
			<CountriesTable countries={countries} />
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
