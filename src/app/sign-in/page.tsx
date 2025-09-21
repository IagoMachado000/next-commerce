import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className='py-14'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center'>
          <SignIn signUpUrl='/sign-up' />
        </div>
      </div>
    </section>
  );
}