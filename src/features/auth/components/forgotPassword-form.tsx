import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
  });

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

  function ForgotPassword() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordSchema),
    });
}