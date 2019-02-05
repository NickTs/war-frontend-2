import java.io.*;
import java.util.*;

  class CountryRu {
    public String iso2;
    public String name;
    public CountryRu(String iso2, String name){
      this.iso2 = iso2;
      this.name = name;
    }
  }

public class CountriesRu {
  public static void main(String argc[]){
     try{
       List<CountryRu> listCountry = new ArrayList<>();
       BufferedReader fr = new BufferedReader(new InputStreamReader(new FileInputStream("./countries.csv"),"UTF-8"));
       String sLine = fr.readLine();
       sLine = fr.readLine();
       while(sLine!=null){
         StringTokenizer st = new StringTokenizer(sLine,";");
         if(st.countTokens()==8){
            st.nextToken();
            st.nextToken();
            String name = st.nextToken();
            st.nextToken();
            st.nextToken();
            st.nextToken();
            String iso2 = st.nextToken();
            CountryRu country = new CountryRu(iso2,name);
            boolean flAdd = true;
            for(int i=0;i<listCountry.size();i++){
              if(listCountry.get(i).name.compareToIgnoreCase(country.name)>0){
                 listCountry.add(i,country);
                 flAdd = false;
                 break;
              }
            }
            if(flAdd) listCountry.add(country);
         }
         sLine = fr.readLine();
       }
       fr.close();
       FileOutputStream fos = new FileOutputStream("./CountriesRu.dat");
       for(CountryRu country: listCountry){
            String result = "{\"key\":"+country.iso2+",\"label\":"+country.name+"},\n";
            fos.write(result.getBytes("UTF-8"));
       }
       fos.close();
     } catch(Throwable e){
        e.printStackTrace();
     }
  }
}