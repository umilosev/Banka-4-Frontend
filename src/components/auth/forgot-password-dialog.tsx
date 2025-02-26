'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPasswordDialog() {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: { email: string }) => {
    console.log('Sending reset link to:', values.email);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm text-gray-500 text-right mt-1 cursor-pointer underline hover:underline">
          Forgot your password?
        </p>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Forgot your password?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Enter your email address, and we’ll send you a link to reset your
            password.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(onSubmit)();
          }}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="example@domain.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="flex justify-end font-normal">
              Send Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
