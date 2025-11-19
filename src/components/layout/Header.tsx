import Logo from '../common/Logo';

// interface HeaderProps {
//   title?: string;
//   children?: React.ReactNode;
// }

function Header() {
  return (
    <header className="px-8 py-5 flex items-center justify-between">
      {/* 왼쪽: 로고 */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* 가운데: 페이지 타이틀 */}
      {/* <div className="flex-1 text-center">
        {title && <h2 className="text-[25px] font-bold text-gray-800">{title}</h2>}
      </div> */}

      {/* 오른쪽: 액션 버튼들 */}
      {/* <div className="flex gap-3">
        {children}
      </div> */}
    </header>
  );
}

export default Header;
