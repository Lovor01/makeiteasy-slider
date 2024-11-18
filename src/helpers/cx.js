export default function cx( ...args ) {
	return args
		.flat()
		.filter( ( x ) => typeof x === 'string' )
		.join( ' ' )
		.trim();
}
