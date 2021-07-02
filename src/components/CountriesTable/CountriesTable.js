import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons';
import { Fragment, useState } from 'react';
import styles from './CountriesTable.module.css';
import Link from 'next/link';

const orderBy = (countries, value, direction) => {
	if (direction === 'asc') {
		return [ ...countries ].sort((a, b) => (a[value] > b[value] ? 1 : -1));
	}
	if (direction === 'desc') {
		return [ ...countries ].sort((a, b) => (a[value] > b[value] ? -1 : 1));
	}
	return countries;
};

const SortArrow = ({ direction }) => {
	if (!direction) {
		return <div />;
	}
	if (direction === 'desc') {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowDownRounded color="inherit" />
			</div>
		);
	}
	if (direction === 'asc') {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowUpRounded color="inherit" />
			</div>
		);
	}
};
const CountriesTable = ({ countries }) => {
	const [ direction, setDirection ] = useState();
	const [ value, setValue ] = useState();
	const orderedCountries = orderBy(countries, value, direction);

	const switchDirection = () => {
		if (!direction) {
			setDirection('desc');
		} else if (direction === 'desc') {
			setDirection('asc');
		} else {
			setDirection(null);
		}
	};

	const setValueAndDirection = (value) => {
		switchDirection();
		setValue(value);
	};
	return (
		<div>
			<div className={styles.heading}>
				<button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
					<div>Name</div>
					<SortArrow />
				</button>
				<button className={styles.heading_population} onClick={() => setValueAndDirection('population')}>
					<div>Population</div>
					<SortArrow direction={direction} />
				</button>
			</div>

			{orderedCountries.map((country) => (
				// eslint-disable-next-line @next/next/link-passhref
				<Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
					<div className={styles.row}>
						<div className={styles.name}>{country.name}</div>
						<div className={styles.population}>{country.population}</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default CountriesTable;
