import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormSuccess } from '@/components/shared/FormSuccess'
import { submitEnterpriseLead } from '@/lib/api'
import { enterpriseLeadSchema, type EnterpriseLeadForm } from '@/types/schemas'
import { Link } from 'react-router-dom'

export function EnterpriseContact() {
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<EnterpriseLeadForm>({
    resolver: zodResolver(enterpriseLeadSchema),
  })

  const onSubmit = async (data: EnterpriseLeadForm) => {
    setSubmitError('')
    try {
      await submitEnterpriseLead(data)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '提交失败，请稍后重试')
      throw err
    }
  }

  if (isSubmitSuccessful) {
    return (
      <>
        <HeroSection
          title="企业合作"
          subtitle="告诉我们您的需求，资深顾问将在1个工作日内与您联系。"
        />
        <FormSuccess message="感谢您的信任，我们的资深顾问会在1个工作日内与您联系。" />
      </>
    )
  }

  return (
    <>
      <HeroSection
        title="企业合作"
        subtitle="告诉我们您的需求，资深顾问将在1个工作日内与您联系。"
      />
      <Container className="py-16 lg:py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-lg space-y-6"
          noValidate
        >
          <div>
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              placeholder="您的姓名"
              className="mt-2"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">公司 *</Label>
            <Input
              id="company"
              placeholder="公司名称"
              className="mt-2"
              aria-invalid={!!errors.company}
              {...register('company')}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-error">{errors.company.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="title">职位 *</Label>
            <Input
              id="title"
              placeholder="您的职位"
              className="mt-2"
              aria-invalid={!!errors.title}
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-error">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact">联系方式 *</Label>
            <Input
              id="contact"
              placeholder="手机号或邮箱"
              className="mt-2"
              aria-invalid={!!errors.contact}
              {...register('contact')}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-error">{errors.contact.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="challenge">您希望解决的挑战</Label>
            <Textarea
              id="challenge"
              placeholder="简要描述您的需求"
              className="mt-2"
              {...register('challenge')}
            />
            {errors.challenge && (
              <p className="mt-1 text-xs text-error">{errors.challenge.message}</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              className="mt-0.5"
              {...register('consent')}
            />
            <Label htmlFor="consent" className="text-xs font-normal leading-relaxed text-text-secondary">
              我已阅读并同意{' '}
              <Link to="/privacy" className="text-accent underline hover:text-accent-hover">
                《隐私政策》
              </Link>
            </Label>
          </div>
          {errors.consent && (
            <p className="text-xs text-error">{errors.consent.message}</p>
          )}

          {submitError && (
            <p className="rounded-md border border-error/20 bg-error/5 px-4 py-2 text-sm text-error">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-md bg-accent px-6 text-sm font-medium text-inverse-text transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {isSubmitting ? '提交中...' : '提交需求'}
          </button>
        </form>
      </Container>
    </>
  )
}
