import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Header from "../../components/Header";

const Signin = ({ providers }) => {
  console.log(providers);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2   -mt-40 px-14 text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
        <p className="font-xs italic">
          This is not a REAL app it is built for educational purposes only
        </p>

        {Object.values(providers).map((provider) => (
          <div className="mt-40" key={provider.name}>
            <button
              className="p-3 bg-blue-500 rounded-lg text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
