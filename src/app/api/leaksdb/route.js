import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  // Validasi parameter
  if (!query) {
    return NextResponse.json({ 
      status: false,
      message: "Parameter query wajib diisi."
    }, { status: 400 });
  }

  // Payload untuk LeaksOSINT API
  const payload = {
    token: "7511358281:BmBc3MHL",
    request: query.trim(),
    limit: 100,
    lang: "en"
  };

  try {
    const response = await fetch("https://leakosintapi.com/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({
        status: false,
        message: `API Error: ${response.status} ${response.statusText}`
      }, { status: 500 });
    }

    const data = await response.json();
    
    // Cek apakah benar-benar ada hasil atau tidak
    let found = false;
    let results = [];
    let totalFound = 0;
    let apiMessage = "";

    if (data && data.List) {
      // Cek apakah ada key "No results found" - ini indikator tidak ada hasil
      if (data.List["No results found"]) {
        found = false;
        results = [];
        totalFound = 0;
        
        // Ambil pesan dari API asli dan decode HTML entities
        const infoLeak = data.List["No results found"].InfoLeak || "";
        apiMessage = infoLeak
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/<\/?em>/g, '') // Hapus tag <em>
          .replace(/\\u003C/g, '<')
          .replace(/\\u003E/g, '>')
          .trim();
      } else {
        // Cek apakah ada data yang benar-benar berisi
        let hasRealData = false;
        
        for (const [dbName, dbData] of Object.entries(data.List)) {
          if (dbData && dbData.Data && Array.isArray(dbData.Data)) {
            // Cek apakah array Data tidak kosong dan berisi object yang tidak kosong
            const nonEmptyData = dbData.Data.filter(item => 
              item && typeof item === 'object' && Object.keys(item).length > 0
            );
            
            if (nonEmptyData.length > 0) {
              hasRealData = true;
              break;
            }
          }
        }
        
        if (hasRealData) {
          found = true;
          results = data.List;
          totalFound = data.NumOfResults || Object.keys(data.List).length;
          apiMessage = "Data berhasil ditemukan di database leaks.";
        } else {
          found = false;
          results = [];
          totalFound = 0;
          apiMessage = "Data tidak ditemukan meskipun API mengembalikan response.";
        }
      }
    }

    if (found) {
      return NextResponse.json({
        status: true,
        message: "Data ditemukan di database leaks.",
        api_message: apiMessage,
        query: query,
        total_found: totalFound,
        results: results,
        free_requests_left: data.free_requests_left || null,
        search_time: data["search time"] || null,
        price: data.price || 0
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Data tidak ditemukan di database leaks.",
        api_message: apiMessage,
        query: query,
        free_requests_left: data.free_requests_left || null,
        search_time: data["search time"] || null,
        price: data.price || 0
      });
    }

  } catch (error) {
    return NextResponse.json({ 
      status: false,
      message: "Terjadi kesalahan saat mencari data.",
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ 
        status: false,
        message: "Parameter query wajib diisi."
      }, { status: 400 });
    }

    const payload = {
      token: "7511358281:BmBc3MHL",
      request: query.trim(),
      limit: 100,
      lang: "en"
    };

    const response = await fetch("https://leakosintapi.com/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json({
        status: false,
        message: `API Error: ${response.status} ${response.statusText}`
      }, { status: 500 });
    }

    const data = await response.json();
    
    let found = false;
    let results = [];
    let totalFound = 0;
    let apiMessage = "";

    if (data && data.List) {
      if (data.List["No results found"]) {
        found = false;
        results = [];
        totalFound = 0;
        
        const infoLeak = data.List["No results found"].InfoLeak || "";
        apiMessage = infoLeak
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/<\/?em>/g, '')
          .replace(/\\u003C/g, '<')
          .replace(/\\u003E/g, '>')
          .trim();
      } else {
        let hasRealData = false;
        
        for (const [dbName, dbData] of Object.entries(data.List)) {
          if (dbData && dbData.Data && Array.isArray(dbData.Data)) {
            const nonEmptyData = dbData.Data.filter(item => 
              item && typeof item === 'object' && Object.keys(item).length > 0
            );
            
            if (nonEmptyData.length > 0) {
              hasRealData = true;
              break;
            }
          }
        }
        
        if (hasRealData) {
          found = true;
          results = data.List;
          totalFound = data.NumOfResults || Object.keys(data.List).length;
          apiMessage = "Data berhasil ditemukan di database leaks.";
        } else {
          found = false;
          results = [];
          totalFound = 0;
          apiMessage = "Data tidak ditemukan meskipun API mengembalikan response.";
        }
      }
    }

    if (found) {
      return NextResponse.json({
        status: true,
        message: "Data ditemukan di database leaks.",
        api_message: apiMessage,
        query: query,
        total_found: totalFound,
        results: results,
        free_requests_left: data.free_requests_left || null,
        search_time: data["search time"] || null,
        price: data.price || 0
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Data tidak ditemukan di database leaks.",
        api_message: apiMessage,
        query: query,
        free_requests_left: data.free_requests_left || null,
        search_time: data["search time"] || null,
        price: data.price || 0
      });
    }

  } catch (error) {
    return NextResponse.json({ 
      status: false,
      message: "Terjadi kesalahan saat mencari data.",
      error: error.message
    }, { status: 500 });
  }
}
