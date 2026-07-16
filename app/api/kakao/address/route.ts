import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: '주소가 필요합니다.' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    console.log('카카오 원본 응답:', JSON.stringify(data, null, 2)); // 임시 로그

    const document = data.documents?.[0];
    const district = document?.address?.region_2depth_name ?? '';
    const neighborhood = document?.address?.region_3depth_name ?? '';

    return NextResponse.json({ district, neighborhood });
  } catch (error) {
    console.error('카카오 주소 검색 실패:', error);
    return NextResponse.json(
      { error: '주소 검색에 실패했어요.' },
      { status: 500 }
    );
  }
}
