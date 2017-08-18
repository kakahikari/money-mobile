<template lang="pug">
  section.terms
    .form__fields.no-border
      template(v-if="language === 'cn'")
        h4 遵守会员规范及法律规定：
        p 您了解您注册成为会员后，即可使用本公司所提供之各项服务(以下称本服务)。当会员使用本服务时，即表示除了同意遵守本服务条款外，还同意接受本公司对会员规范(包括各项游戏规则、公告及注意事项等)及相关法令规定之拘束，本公司所有产品与客户服务、软件系统、网络架构等相关业务事宜，皆由菲律宾政府所授权和监管之合法线上娱乐公司，使用本服务之会员请遵守使用者当地法令之许可，如有违反之情事恕非本服务之负责范围。
        h4 服务简介：
        p 本公司旨在创造一个『安全可靠』、『即时便利』、『公平公正』、『专业营运』的优质娱乐服务平台，强调是让会员不受时空的限制，24小时随时上线就可以参与一个公​​平公正的游戏，亦可以享受到与世界各地玩家切磋的乐趣，我们秉持以客为尊的态度，不断开发创新及了解客户需求是本公司引以为傲的经营理念，翼望能创造出崭新的娱乐价值以及达到多方普及的目的，成为具有领导指标性的娱乐网站。
        h4 真实登录义务：
        p 基于本公司所提供之各项服务，您同意于注册时依注册申请程序所提示之项目，登录您本人正确、真实及完整之个人资料；当您的个人资料有异动时，请立即更新，以维持您个人资料之正确、真实及完整。如因您登录不实资料或冒用他人名义以致于侵害他人之权利或违法时，应自负法律责任；您并同意您所提供之个人资料不实或个人资料有异动但没有更新以致于与原登录之资料不符时，本公司有权随时终止您的会员资格及使用各项会员服务之权利。
        h4 服务之停止与更改：
        ol
          li 会员登录之资料不实。
          li 使用他人的名义申请本服务。
          li 违反游戏公平原则。
          li 参与游戏或比赛时，故意钻研系统漏洞或利用游戏弱点以影响结果。
          li 违反本服务条款时。
          li 本公司不允许不公平的下注方式、无风险下注及任何无风险解冻之下注方式，如有发现上述问题之玩家，本公司有终止玩家帐号使用之权力。如有任何争议问题，本公司有最终决定权。无论任何情形，就停止或更改服务或终止会员帐户服务所可能产生之困扰、不便或损害，本服务对任何会员或第三人均不负任何责任。
        h4 服务暂停或中断：
        ol
          li 本公司于下列情形之一时，得暂停或中断本服务之全部或一部，对于使用者不负担任何赔偿责任：
            ol
              li 对于本服务相关系统设备进行迁移、更换或维护时。
              li 因不可归责于本公司所造成服务停止或中断。
              li 因不可抗力所造成服务停止或中断
          li 如因本公司对于本网站相关系统设备进行迁移、更换或维护而必须暂停或中断全部或一部之服务时，本公司于暂停或中断前将以电子邮件通知或于本网站上公告。
          li 对于本服务之暂停或中断，可能造成您使用上的不便、资料遗失或其他经济及时间上之损失，您平时应采取适当的防护措施，以保障您的权益。
        h4 保管义务：
        p 会员有义务妥善保管在本网站之帐号与密码，并为此组帐号与密码登入系统后所进行之一切活动负责。为维护会员自身权益，请勿将帐号与密码泄露或提供予第三人知悉，或出借或转让他人使用。
        h4 会员规范之增订及修改：
        p 本服务条款如有增订或修改，您同意自该修订条款于本网站公告之时起受其拘束，本网站将不对会员各别通知。如您于公告后继续使用本服务，则视为您已经同意该修订条款。
      template(v-else)
        h4 Laws and Regulations for Members:
        p Once your registration of membership is confirmed, you will be able to use any of our services (the “Services”). When members use the Services, it means they agree not only to follow its regulations but also to accept all rules prescribed by our company, inclusive of each game rule and announcement. All of our products, customer services, software systems, and structure of the Internet are authorized and supervised by the Philippine government. Thus, members who use the Services must observe the local user laws; violations of laws are outside the scope of the Services.
        h4 Introduction to the Services:
        p Our company was in an effort to establish a secure, convenient, unbiased, and professional entertainment platform, accentuating the feature of unlimited time and space which allows the members to compete with users around the world anytime. Serving the members is always our first priority, and we are proud of our management philosophy of inconsistent development and understanding the clients’ needs. We are working on creating new entertainment values and making them as available as possible. This entertainment platform is expected to be a top one.
        h4 Obligation of Authentic Login:
        p For our services, you consent to do a registration following the application procedures and inputting complete and correct personal information. To keep your details real and the most updated, please make immediate changes if there are any. If one is found guilty of fraud or infringed upon the rights of others, he or she will need to be accountable for those deeds. Besides, you also consent to our randomly terminating your membership and your rights to use our services in case of violations of above-mentioned laws.
        h4 Termination and Modification of the Services:
        ol
          li The provided member information was false.
          li The application for the services was filed with other’s name (not the applicant).
          li Violation of principles of equity.
          li Purposely exploit the loopholes in the games to affect the game outcomes.
          li Violation of laws of the services.
          li Any unfair or riskless wagers are not allowed and will lead to the termination of a user account. Our company reserves the decision right for any controversial issues. Compensation for the inconveniences caused by termination or modification of the services is outside of our service scope.
        h4 Suspension of the Services:
        ol
          li Our company must suspend all or a part of the services in response to the following situations, and no compensation would be made for users’ losses.
            ol
              li Relocation, maintenance, or replacement for the systems and equipment of the services.
              li Force majeure circumstances in which our company cannot be blamed for.
              li Factors or situations outside the scope of the services.
          li Should all or a part of the services are suspended due to the relocation, maintenance, or replacement for the website’s systems and equipment, our company must notify all users via emails or website announcement.
          li To prevent the loss of your data, time and money, we highly suggest your taking proper precaution for the guarantee of your rights as suspension of the services might cause you inconveniences.
        h4 Responsibility for Safekeeping:
        p Members are responsible for safekeeping their account numbers and passwords as well as all activities they engage in after logging in the system. To make sure your rights are protected, please do not unveil your account number and password or lend them to others.
        h4 Revision of the Membership Regulations:
        p You consent to observe the to-be-revised or added regulations once they are proclaimed on the website. No additional notification will be made, and you are deemed agreeable to the revision if you continue using our services after the proclamation. 
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'terms',

    computed: mapState({
      language: state => {
        return state.USER.language
      }
    })
  }
</script>
<style lang="scss" scoped>
.terms {
  padding-top: 10px;
}
ol {
  padding-left: 1.2em;
  padding-bottom: .5em;
  ol {
    list-style-type: lower-alpha;
  }
}
</style>
