import { Container } from '@/components/layout/Container'

export function Terms() {
  return (
    <Container className="py-16 lg:py-20">
      <h1 className="text-[clamp(28px,3.5vw,40px)] font-bold leading-tight tracking-tight text-text-primary">
        服务条款
      </h1>
      <p className="mt-2 text-sm text-text-secondary">最后更新日期：2026 年 5 月 17 日</p>

      <div className="mt-8 max-w-[800px] space-y-8 text-base leading-relaxed text-text-muted">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">一、服务范围</h2>
          <p>
            ZAN（左安 / Zuo An Nexus）通过本网站提供以下服务信息展示和在线表单提交功能：
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>高端人才网络与咨询平台的介绍</li>
            <li>项目机会的展示</li>
            <li>洞察文章与课程项目的展示</li>
            <li>企业需求提交与人才入驻申请的在线表单</li>
          </ul>
          <p className="mt-2">
            具体的咨询服务、人才匹配和项目合作事宜由 ZAN 顾问团队在线下跟进，
            不属于本网站的直接服务范围。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">二、用户责任</h2>
          <p className="mb-2">在使用本网站时，您同意：</p>
          <ul className="list-inside list-disc space-y-1">
            <li>提供真实、准确、完整的个人信息</li>
            <li>不提交虚假、误导或恶意信息</li>
            <li>不以任何方式干扰或破坏本网站的正常运行</li>
            <li>不利用本网站从事任何违反法律法规的活动</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">三、免责声明</h2>
          <p>
            本网站上展示的项目信息均经过脱敏处理，仅供参考。ZAN 不对因使用本网站信息而产生的
            任何直接或间接损失承担责任。本网站上的内容（包括但不限于文章、案例描述）仅代表发布时的观点，
            不构成任何商业建议。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">四、知识产权</h2>
          <p>
            本网站的所有内容，包括但不限于文字、图片、设计、标识、代码，
            均为 ZAN 或其内容提供者所有，受中华人民共和国著作权法保护。
            未经 ZAN 书面授权，不得以任何形式复制、转载或传播本网站的内容。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">五、表单提交说明</h2>
          <p>
            通过本网站提交的企业需求和人才入驻申请，仅表示您有意向与 ZAN 建立联系，
            不构成任何形式的合同或服务承诺。ZAN 保留对所有提交信息进行审核和筛选的权利。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">六、条款修改</h2>
          <p>
            ZAN 有权根据业务发展和法律法规变化随时修改本服务条款。修改后的条款将在本页面发布，
            并标注更新日期。继续使用本网站即视为您接受修改后的条款。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">七、争议解决</h2>
          <p>
            因使用本网站产生的任何争议，双方应友好协商解决。协商不成的，
            任何一方均可向 ZAN 所在地有管辖权的人民法院提起诉讼。
            本服务条款适用中华人民共和国法律。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-text-primary">八、联系我们</h2>
          <p>
            如果您对本服务条款有任何疑问，请联系我们：
          </p>
          <p className="mt-2">
            邮箱：contact@zuoanmen.com
          </p>
        </section>
      </div>
    </Container>
  )
}
