import { Container } from '@/components/layout/Container'

export function Privacy() {
  return (
    <Container className="py-16 lg:py-20">
      <h1 className="text-[clamp(28px,3.5vw,40px)] font-bold leading-tight tracking-tight text-text-primary">
        隐私政策
      </h1>
      <p className="mt-2 text-sm text-text-secondary">最后更新日期：2026 年 5 月 17 日</p>

      <div className="mt-8 max-w-[800px] space-y-8 text-base leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">一、我们是谁</h2>
          <p>
            ZAN（左安 / Zuo An Nexus）是一个面向 AI 转型时代的高端人才网络与咨询平台。
            本隐私政策说明我们在您使用 ZAN 网站（以下简称"本网站"）时如何收集、使用和保护您的个人信息。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">二、我们收集哪些信息</h2>
          <p className="mb-2">当您通过本网站提交表单时，我们可能收集以下信息：</p>
          <ul className="list-inside list-disc space-y-1">
            <li>姓名</li>
            <li>公司名称与职位</li>
            <li>联系方式（手机号、邮箱或微信号）</li>
            <li>所在行业</li>
            <li>核心能力描述</li>
            <li>您希望解决的业务挑战（选填）</li>
          </ul>
          <p className="mt-2">
            我们不会通过 Cookie 或类似技术主动追踪您的浏览行为。本网站不要求用户注册账号。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">三、我们如何使用您的信息</h2>
          <p className="mb-2">我们收集的信息仅用于以下目的：</p>
          <ul className="list-inside list-disc space-y-1">
            <li>与您取得联系，跟进您的合作需求或入驻申请</li>
            <li>评估企业需求与人才匹配度</li>
            <li>邀请您加入 ZAN 人才社群</li>
            <li>改进我们的服务质量</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">四、信息存储与安全</h2>
          <p>
            您的数据存储在安全的云端数据库中，采用行业标准的加密和访问控制措施。
            仅经授权的团队成员可以访问您提交的信息。我们不会在服务器日志中记录您提交的具体内容。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">五、第三方分享</h2>
          <p>
            我们不会将您的个人信息出售、出租或以其他方式提供给任何第三方，
            除非获得您的明确同意，或根据法律法规的要求。
            您的信息仅在 ZAN 内部团队中使用。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">六、您的权利</h2>
          <p className="mb-2">根据《中华人民共和国个人信息保护法》（PIPL），您享有以下权利：</p>
          <ul className="list-inside list-disc space-y-1">
            <li>查阅我们持有的您的个人信息</li>
            <li>要求更正不准确的信息</li>
            <li>要求删除您的个人信息</li>
            <li>撤回您此前给予的同意</li>
          </ul>
          <p className="mt-2">
            如需行使上述任何权利，请通过下方联系方式与我们联系。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">七、政策更新</h2>
          <p>
            我们可能会不定期更新本隐私政策。更新后的政策将在本页面发布，并标注最新更新日期。
            建议您定期查阅本页面。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">八、联系我们</h2>
          <p>
            如果您对本隐私政策有任何疑问，请联系我们：
          </p>
          <p className="mt-2">
            邮箱：contact@zuoanmen.com
          </p>
        </section>
      </div>
    </Container>
  )
}
