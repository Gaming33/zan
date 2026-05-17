import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from '@/components/layout/Container'
import { HeroSection } from '@/components/sections/HeroSection'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormSuccess } from '@/components/shared/FormSuccess'
import { submitTalentLead } from '@/lib/api'
import { talentLeadSchema, type TalentLeadForm } from '@/types/schemas'
import { Link } from 'react-router-dom'

export function TalentApply() {
  const [submitError, setSubmitError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TalentLeadForm>({
    resolver: zodResolver(talentLeadSchema),
  })

  const onSubmit = async (data: TalentLeadForm) => {
    setSubmitError('')
    try {
      await submitTalentLead(data)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '提交失败，请稍后重试')
      throw err
    }
  }

  if (isSubmitSuccessful) {
    return (
      <>
        <HeroSection
          title="人才入驻申请"
          subtitle="提交您的信息，加入我们的高端人才社区。"
        />
        <FormSuccess message="感谢您的关注，我们会尽快与您联系。" />
      </>
    )
  }

  return (
    <>
      <HeroSection
        title="人才入驻申请"
        subtitle="提交您的信息，加入我们的高端人才社区。"
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
            <Label htmlFor="position">当前/最近职位 *</Label>
            <Input
              id="position"
              placeholder="如：某制造业集团 VP"
              className="mt-2"
              aria-invalid={!!errors.position}
              {...register('position')}
            />
            {errors.position && (
              <p className="mt-1 text-xs text-error">{errors.position.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="industry">所在行业 *</Label>
            <Input
              id="industry"
              placeholder="如：制造业、金融、消费"
              className="mt-2"
              aria-invalid={!!errors.industry}
              {...register('industry')}
            />
            {errors.industry && (
              <p className="mt-1 text-xs text-error">{errors.industry.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="skills">核心能力</Label>
            <Input
              id="skills"
              placeholder="如：战略规划、组织变革、AI产品"
              className="mt-2"
              {...register('skills')}
            />
            {errors.skills && (
              <p className="mt-1 text-xs text-error">{errors.skills.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact">联系方式 *</Label>
            <Input
              id="contact"
              placeholder="手机号/邮箱/微信号"
              className="mt-2"
              aria-invalid={!!errors.contact}
              {...register('contact')}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-error">{errors.contact.message}</p>
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
            {isSubmitting ? '提交中...' : '提交申请'}
          </button>
        </form>
      </Container>
    </>
  )
}
