import { Container } from '@/components/layout/Container'

interface FormSuccessProps {
  message: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-lg border border-success/20 bg-success/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
          <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-text-primary">{message}</p>
      </div>
    </Container>
  )
}
