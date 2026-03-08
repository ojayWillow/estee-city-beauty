import Card from '@/components/ui/Card';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Ienākt sistēmā</h1>
          <p className="text-gray-600">Pieslēdzies savam meistara kontam</p>
        </div>
        <Card>
          <LoginForm />
        </Card>
        <div className="text-center mt-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Atpakaļ uz sākumlapu
          </Link>
        </div>
      </div>
    </div>
  );
}
