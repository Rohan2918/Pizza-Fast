import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden font-semibold text-stone-700 md:block">
      {username}
    </div>
  );
}

export default Username;
