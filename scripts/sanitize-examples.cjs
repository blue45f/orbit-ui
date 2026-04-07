const fs = require('fs')
const path = require('path')

const replacements = [
  { from: '배달팁은 어떻게 결정되나요?', to: '서비스 이용 정책은 무엇인가요?' },
  { from: '배달 팁은 어떻게 결정되나요?', to: '서비스 이용료 기준이 궁금해요.' },
  { from: '배달팁이 달라져요.', to: '서비스 정책에 따라 차이가 있을 수 있습니다.' },
  { from: '총 배달팁', to: '최종 이용료' },
  { from: '주문금액', to: '이용금액' },
  { from: '주문 취소는 어떻게 하나요?', to: '신청 취소는 어떻게 진행되나요?' },
  { from: '가게에서 주문을 접수하기 전이라면', to: '관리자가 요청을 승인하기 전이라면' },
  { from: '[주문내역]', to: '[이용내역]' },
  { from: '이미 조리가 시작되었다면', to: '이미 서비스 처리가 시작되었다면' },
  { from: '결제 수단을 변경할 수 있나요?', to: '등록된 수단을 변경할 수 있나요?' },
  { from: '결제가 완료된 후에는', to: '처리가 완료된 후에는' },
  { from: '다시 주문해 주세요.', to: '다시 신청해 주세요.' },
  { from: '수령방법이 변경됐어요.', to: '이용 정책이 업데이트되었습니다.' },
  { from: '결제금액과 함께 확인 후 결제해주세요.', to: '내용을 확인하신 후 동의해 주세요.' },
  { from: '결제를 거절하시겠어요?', to: '요청을 취소하시겠어요?' },
  { from: '결제요청을 거절하시려면', to: '요청 취소 사유를 입력하시려면' },
  { from: '가족계정 결제를 선택할까요?', to: '공유 계정 사용을 활성화할까요?' },
  { from: '가족계정으로 결제하면', to: '공유 계정을 사용하면' },
  { from: '가족계정 결제 선택', to: '공유 계정 활성화' },
  { from: '배달이', to: '에이더' },
  { from: '배달방식', to: '서비스 방식' },
  { from: '사장님이 사용하는 요금제', to: '업체별 적용 멤버십' },
  { from: '샘플앱클럽 혜택', to: '에이더 멤버십 혜택' },
]

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf-8')
      let changed = false
      replacements.forEach(({ from, to }) => {
        if (content.includes(from)) {
          content = content.split(from).join(to)
          changed = true
        }
      })
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8')
        console.log(`Updated: ${filePath}`)
      }
    }
  })
}

walkDir('packages/theme-eclipse/src/components')
