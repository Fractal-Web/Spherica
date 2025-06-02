export const fetchPosts = async () => {
	const res = await fetch("http://localhost:8000/api");
	const data = await res.json();

	return data;
};
